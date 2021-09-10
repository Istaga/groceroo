## Specifies the Region your Terraform Provider will server
provider "aws" {
  region = "us-east-1"
}

## Specifies the S3 Bucket and DynamoDB table used for the durable backend and state locking
terraform {
    backend "s3" {
      encrypt = true
      bucket = "groceroo-tfstate"
      dynamodb_table = "terraform-state-lock-dynamo-groceroo"
      key = "path/path/terraform.tfstate"
      region = "us-east-1"
  }
}


# # 1. Create VPC
# resource "aws_vpc" "groceroo_vpc" {
#     cidr_block = "10.0.0.0/16"
#     tags = {
#         Name = "production"
#     }
# }

# # 1.5 make key-pair on ec2


# # 2. Create Internet Gateway -> make public IP available to world

# resource "aws_internet_gateway" "gw" {
#   vpc_id = aws_vpc.groceroo_vpc.id

#   tags = {
#     Name = "tut_gateway"
#   }
# }

# # 3. Custom Route Table

# resource "aws_route_table" "tut_route_table" {
#   vpc_id = aws_vpc.groceroo_vpc.id

#   route {
#     cidr_block = "0.0.0.0/0"

#     gateway_id = aws_internet_gateway.gw.id
#   }

#   route {
#     ipv6_cidr_block        = "::/0"
#     gateway_id = aws_internet_gateway.gw.id
#   }

#   tags = {
#     Name = "prodRoute"
#   }
# }

# # 4. Create a Subnet
  
# resource "aws_subnet" "tut_subnet_1" {
#   vpc_id     = aws_vpc.groceroo_vpc.id
#   cidr_block = "10.0.1.0/24"
#   availability_zone = "us-east-1a"

#   tags = {
#     Name = "prod_subnet_1"
#   }
# }

# # 5. Associate subnet with Route Table
# resource "aws_route_table_association" "a" {
#   subnet_id      = aws_subnet.tut_subnet_1.id
#   route_table_id = aws_route_table.tut_route_table.id
# }

# # 6. Create Security Group to allow port 22, 80, 443 (SSH, HTTP, HTTPS)
# resource "aws_security_group" "allow_web" {
#   name        = "allow_web+traffic"
#   description = "Allow Web inbound traffic"
#   vpc_id      = aws_vpc.groceroo_vpc.id

#   ingress {
#     description      = "HTTPS traffic from VPC"
#     from_port        = 443
#     to_port          = 443
#     protocol         = "tcp"
#     cidr_blocks      = ["0.0.0.0/0"]
#   }

#   ingress {
#     description      = "HTTP traffic from VPC"
#     from_port        = 80
#     to_port          = 80
#     protocol         = "tcp"
#     cidr_blocks      = ["0.0.0.0/0"]
#   }

#   ingress {
#       description      = "SSH traffic"
#       from_port        = 22
#       to_port          = 22
#       protocol         = "tcp"
#       cidr_blocks      = ["0.0.0.0/0"]
#   }

#   egress {
#     from_port        = 0
#     to_port          = 0
#     protocol         = "-1"
#     cidr_blocks      = ["0.0.0.0/0"]
#   }

#   tags = {
#     Name = "allow_web"
#   }
# }

# # 7. Create a network interface with an ip in the subnet that was created in step 4
# resource "aws_network_interface" "tut_web_server" {
#   subnet_id       = aws_subnet.tut_subnet_1.id
#   private_ips     = ["10.0.1.50"]
#   security_groups = [aws_security_group.allow_web.id]
# }

# # 8. Assign an elastic IP to the network interface from step 7
# resource "aws_eip" "tut_eip" {
#   network_interface = aws_network_interface.tut_web_server.id
#   vpc      = true
#   associate_with_private_ip = "10.0.1.50"
#   depends_on = [aws_internet_gateway.gw]
# }

# # 9. Create Ubuntu server and install/enable Apache2
# # ubuntu ami ami-0e28822503eeedddc ca-central
# # ubuntu ami ami-0747bdcabd34c712a us-east
# resource "aws_instance" "tut_ec2_instance" {
#   ami = "ami-0747bdcabd34c712a"
#   instance_type = "t2.micro"
#   availability_zone = "us-east-1a"
#   key_name = "groceroo-keys"

#   network_interface {
#     device_index = 0
#     network_interface_id = aws_network_interface.tut_web_server.id
#   }

#   user_data = <<-EOF
#             #!/bin/bash
#             sudo apt update -y
#             sudo apt install apache2 -y
#             sudo systemctl start apache2
#             sudo bash -c 'echo im sweet cheeks and i happen to be something cuter > /var/www/html/index.html'
#             echo 'Kakyoin are you in there?' > data.txt
#             EOF
  
#   tags = {
#     Name = "tf-web-server"
#   }
# }

# output "server_ip" {
#   value = aws_eip.tut_eip.public_ip
# }

# output "server_private_ip" {
#   value = aws_eip.tut_eip.private_ip
# }

# output "groceroo_vpc" {
#   value = aws_vpc.groceroo_vpc
# }


# 10. Random Lightsail server
resource "aws_lightsail_instance" "django_test" {
  name              = "Django_lightsail_tings"
  availability_zone = "us-east-1a"
  blueprint_id      = "django_bitnami"
  bundle_id         = "micro_2_0"
  tags = {
    Name = "Groceroo Django"
  }
}

output "please" {
    value = django_test.name
}