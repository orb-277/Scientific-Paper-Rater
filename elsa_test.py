from elsapy.elsclient import ElsClient
from elsapy.elssearch import ElsSearch
from elsapy.elsprofile import ElsAuthor
from elsapy.elsdoc import AbsDoc

import json


def search_auth_by_name(fstname, lstname, schoolid, client):
    """Find author's Scopus ID by first, last name and affiliation ID.
    In case of an error, perform search without affiliation ID and return first author in the serach result
    """
    auth_srch = ElsSearch('AUTHLASTNAME(%s)'%lstname + ' AUTHFIRST(%s)'%fstname + ' AF-ID(%s)'%schoolid,'author')
    auth_srch.execute(client)

    #print ("auth_srch has", len(auth_srch.results), "results.")
    authorfound = auth_srch.results[0]
    
    if 'error' in authorfound.keys():
        status = 'error'
        auth_srch = ElsSearch('AUTHLASTNAME(%s)'%lstname + ' AUTHFIRST(%s)'%fstname ,'author')
        auth_srch.execute(client)

        #print ("auth_srch has", len(auth_srch.results), "results.")
        authorfound = auth_srch.results[0]
        if 'error' in authorfound.keys():
            status = 'error'
            return status, {}
        if 'affiliation-current' in authorfound.keys():
            if authorfound['affiliation-current']['affiliation-id']!=schoolid:
                status = 'new-affil'
            else:
                status = 'success'
        else:
            print(fstname, lstname, ' --- can not find affiliation-current in keys')
            status = 'warning'
    else:
        status = 'success'
    
    return status, authorfound

apikey = '4cc20e5ed48e63f2061a88a4154566bf' # insert a valid apikey

## Initialize client
client = ElsClient(apikey)
client.inst_token = '' # leave it blank unless you have it
first_name = 'Yurii'
last_name = 'Morozov'

auth_srch = ElsSearch('AUTHLASTNAME(%s)'%last_name + ' AUTHFIRST(%s)'%first_name,'author')
auth_srch.execute(client)

print ("Found ", len(auth_srch.results), " authors \n")
authorfound = auth_srch.results[0]

print('{:<6} {:<6} {:<12} {:<15} {:>}'.format('First name |', 'Last name |', 'Scopus ID |', 'Affil ID', '| Affil name'))
print('-'*80)
for author in auth_srch.results:
    #let's look on every author and print the name and affiliaiton stored in Scopus  
    author_id = author['dc:identifier'].split(':')[1]
    first_name_scopus = author['preferred-name']['given-name']
    last_name_scopus = author['preferred-name']['surname']
    affil_name = author['affiliation-current']['affiliation-name']
    affil_id = author['affiliation-current']['affiliation-id']
    
    print('{:<12} {:<11} {:<14} {:<14} {:>}'.format(first_name_scopus, last_name_scopus, author_id, affil_id, affil_name))