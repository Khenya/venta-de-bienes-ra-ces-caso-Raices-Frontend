provider "aws" {
  region = "us-east-1"
}

variable "public_key" {
  description = "SSH public key for EC2 access"
  type        = string
}

resource "aws_security_group" "react_sg" {
  name        = "react-frontend-sg"
  description = "Security group for React frontend"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "React Dev Server"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP (Next.js build)"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_key_pair" "react-ssh" {
  key_name   = "react-ssh"
  public_key = var.public_key
}

resource "aws_instance" "react_server" {
  ami                    = "ami-01816d07b1128cd2d"
  instance_type          = "t2.micro"
  key_name               = aws_key_pair.react-ssh.key_name
  vpc_security_group_ids = [aws_security_group.react_sg.id]

  tags = {
    Name = "React-App-Server"
  }

  provisioner "remote-exec" {
    connection {
      type        = "ssh"
      host        = self.public_ip
      user        = "ec2-user"
      private_key = file("${path.module}/id_rsa")
    }

    inline = [
      "sudo yum update -y",
      "sudo yum install -y git",
      "curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -",
      "sudo yum install -y nodejs",
      "git clone https://github.com/Khenya/venta-de-bienes-ra-ces-caso-Raices-Frontend /home/ec2-user/app",
      "cd /home/ec2-user/app",
      "npm install"
    ]
  }
}

output "ec2_public_ip" {
  value = aws_instance.react_server.public_ip
}

output "application_url" {
  value = "http://${aws_instance.react_server.public_ip}:3000"
}