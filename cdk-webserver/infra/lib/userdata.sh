#!/bin/bash

sudo su 
yum update -y
yum install -y httpd

systemctl start httpd
systemctl enable httpd

echo "<h1>Hello from AWS CDK from Shyam Desai" > /var/www/html/index.html