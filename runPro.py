#!/usr/bin/python
# -*- coding: UTF-8 -*-

import cgi
import cgitb
import os

form = cgi.FieldStorage()

siteID = str(form.getvalue('testID'))
sitePhone = str(form.getvalue('phone'))
siteContact = str(form.getvalue('contact'))

fobj = open('ProposerInfo.txt', 'a+')
if siteContact == "0":
    fobj.write("%-13s%-13s\n" % ("testID", "phone") )
    fobj.write("%-13s%-13s\n" % (siteID, sitePhone))
    fobj.write("%-13s%-13s\n" % ("total", "selfown", "others"))
elif siteContact == "1":
    fobj.write("%-13s%-13s%-13s\n" % ("100", siteID, sitePhone))
elif siteContact == "2":
    fobj.write("%-13s%-13s%-13s\n" % ("120", siteID, sitePhone))
elif siteContact == "3":
    fobj.write("%-13s%-13s%-13s\n" % ("120", siteID, sitePhone))
    fobj.write("\n")
fobj.close()

print "Content-type:text/html"
print
print "<html>"
print "<head>"
print "<meta charset=\"utf-8\">"
print "<title>菜鸟教程 CGI 测试实例</title>"
print "</head>"
print "<body>"
print "<h2>%s官网：%s</h2>" % (siteID, sitePhone)
print "</body>"
print "</html>"






