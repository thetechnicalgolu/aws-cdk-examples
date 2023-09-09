import json 
import boto3
client = boto3.client("s3")

def lambda_handler(event, context):
    response = client.get_object(
        Bucket="balancestatus5645",
        Key='accountStatus.json'
    )
  
    # Convert from streaming data to byte
    data_byte = response["Body"].read()

    # Convert from bytes to strings
    data_string = data_byte.decode("UTF-8")

    # Convert from json string to dictionary
    data_dict = json.loads(data_string)

    return {
        "statusCode":200,
        "body":json.dumps(data_dict),
        "headers":{
            'Content-Type':'application/json'
        }
    }