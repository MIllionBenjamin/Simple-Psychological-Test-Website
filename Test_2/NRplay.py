#!/usr/bin/python
# -*- coding: UTF-8 -*-

import cgi
import cgitb
import os

form = cgi.FieldStorage()

P1 = str(form.getvalue('P1'))
P2 = str(form.getvalue('P2'))
P3 = str(form.getvalue('P3'))
P4 = str(form.getvalue('P4'))
User = str(form.getvalue('User'))
testID = str(form.getvalue('testID'))
roundNum = str(form.getvalue('roundNum'))

fileName = "NR-" + testID + "-Record.txt"

fobj = open(fileName, 'a+')
if roundNum == "-1":
    fobj.write("%-13s%-13s\n" % ("testID", "User is"))
    fobj.write("%-13s%-13s\n" % (testID, User))
    fobj.write("%-13s%-13s%-13s%-13s%-13s\n" % ("Round", "P1", "P2", "P3", "P4"))

elif roundNum == "Over!Coins":
    fobj.write("%-13s%-13s%-13s%-13s%-13s\n" % (roundNum, P1, P2, P3, P4))

elif roundNum == "Over!Score":
    fobj.write("%-13s%-13s%-13s%-13s%-13s\n" % (roundNum, P1, P2, P3, P4))
    fobj.write("\n")

else:
    fobj.write("%-13s%-13s%-13s%-13s%-13s\n" % (roundNum, P1, P2, P3, P4))
fobj.close()

print "Content-type:text/html"
print
print "<html>"
print "<head>"
print "<meta charset=\"utf-8\">"
print "<title>菜鸟教程 CGI 测试实例</title>"
print "</head>"
print "<body>"
print "<h2>%s官网：%s</h2>" % (P1, P1)
print "</body>"
print "</html>"






