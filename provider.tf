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