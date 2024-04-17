import json
import random
from faker import Faker

# Load the JSON data
main_json = json.loads('''
[
    {"id": 1, "username": "JohnDoe", "email": "johndoe@example.com", "role": "admin"},
    {"id": 2, "username": "JaneSmith", "email": "janesmith@example.com", "role": "member"},
    {"id": 3, "username": "AliceJones", "email": "alicejones@example.com", "role": "member"},
    {"id": 4, "username": "BobBrown", "email": "bobbrown@example.com", "role": "member"},
    {"id": 5, "username": "CarolWhite", "email": "carolwhite@example.com", "role": "admin"},
    {"id": 6, "username": "DavidWilson", "email": "davidwilson@example.com", "role": "member"},
    {"id": 7, "username": "EveBlack", "email": "eveblack@example.com", "role": "member"},
    {"id": 8, "username": "FrankClark", "email": "frankclark@example.com", "role": "member"},
    {"id": 9, "username": "GraceHall", "email": "gracehall@example.com", "role": "admin"},
    {"id": 10, "username": "HenryAllen", "email": "henryallen@example.com", "role": "member"},
    {"id": 11, "username": "IvyScott", "email": "ivyscott@example.com", "role": "member"},
    {"id": 12, "username": "JackYoung", "email": "jackyoung@example.com", "role": "member"},
    {"id": 13, "username": "KarenHarris", "email": "karenharris@example.com", "role": "admin"},
    {"id": 14, "username": "LeoWalker", "email": "leowalker@example.com", "role": "member"},
    {"id": 15, "username": "MiaKing", "email": "miaking@example.com", "role": "member"},
    {"id": 16, "username": "NoraLee", "email": "noralee@example.com", "role": "member"}
]
''')

second_json = json.loads('''
[{
  "_id": {
    "$oid": "661dd610fda3c080a4f5f020"
  },
  "user_id": 1,
  "username": "JohnDoe",
  "groups": [
    {
      "group_id": "grp001",
      "role": "owner"
    },
    {
      "group_id": "grp002",
      "role": "member"
    },
    {
      "group_id": "grp003",
      "role": "member"
    }
  ]
},
{
  "_id": {
    "$oid": "661dd610fda3c080a4f5f021"
  },
  "user_id": 2,
  "username": "JaneSmith",
  "groups": [
    {
      "group_id": "grp002",
      "role": "member"
    },
    {
      "group_id": "grp004",
      "role": "member"
    }
  ]
},
{
  "_id": {
    "$oid": "661dd610fda3c080a4f5f022"
  },
  "user_id": 3,
  "username": "AliceJones",
  "groups": [
    {
      "group_id": "grp002",
      "role": "member"
    }
  ]
},
{
  "_id": {
    "$oid": "661dd610fda3c080a4f5f023"
  },
  "user_id": 4,
  "username": "BobBrown",
  "groups": [
    {
      "group_id": "grp002",
      "role": "member"
    }
  ]
},
{
  "_id": {
    "$oid": "661dd610fda3c080a4f5f024"
  },
  "user_id": 5,
  "username": "CarolWhite",
  "groups": [
    {
      "group_id": "grp001",
      "role": "owner"
    },
    {
      "group_id": "grp005",
      "role": "member"
    }
  ]
},
{
  "_id": {
    "$oid": "661dd610fda3c080a4f5f025"
  },
  "user_id": 6,
  "username": "DavidWilson",
  "groups": [
    {
      "group_id": "grp002",
      "role": "member"
    }
  ]
},
{
  "_id": {
    "$oid": "661dd610fda3c080a4f5f026"
  },
  "user_id": 7,
  "username": "EveBlack",
  "groups": [
    {
      "group_id": "grp002",
      "role": "member"
    }
  ]
},
{
  "_id": {
    "$oid": "661dd610fda3c080a4f5f027"
  },
  "user_id": 8,
  "username": "FrankClark",
  "groups": [
    {
      "group_id": "grp002",
      "role": "member"
    }
  ]
},
{
  "_id": {
    "$oid": "661dd610fda3c080a4f5f028"
  },
  "user_id": 9,
  "username": "GraceHall",
  "groups": [
    {
      "group_id": "grp001",
      "role": "owner"
    },
    {
      "group_id": "grp006",
      "role": "member"
    }
  ]
},
{
  "_id": {
    "$oid": "661dd610fda3c080a4f5f029"
  },
  "user_id": 10,
  "username": "HenryAllen",
  "groups": [
    {
      "group_id": "grp002",
      "role": "member"
    }
  ]
},
{
  "_id": {
    "$oid": "661dd610fda3c080a4f5f02a"
  },
  "user_id": 11,
  "username": "IvyScott",
  "groups": [
    {
      "group_id": "grp002",
      "role": "member"
    }
  ]
},
{
  "_id": {
    "$oid": "661dd610fda3c080a4f5f02b"
  },
  "user_id": 12,
  "username": "JackYoung",
  "groups": [
    {
      "group_id": "grp002",
      "role": "member"
    }
  ]
},
{
  "_id": {
    "$oid": "661dd610fda3c080a4f5f02c"
  },
  "user_id": 13,
  "username": "KarenHarris",
  "groups": [
    {
      "group_id": "grp001",
      "role": "owner"
    },
    {
      "group_id": "grp007",
      "role": "member"
    }
  ]
},
{
  "_id": {
    "$oid": "661dd610fda3c080a4f5f02d"
  },
  "user_id": 14,
  "username": "LeoWalker",
  "groups": [
    {
      "group_id": "grp002",
      "role": "member"
    }
  ]
},
{
  "_id": {
    "$oid": "661dd610fda3c080a4f5f02e"
  },
  "user_id": 15,
  "username": "MiaKing",
  "groups": [
    {
      "group_id": "grp002",
      "role": "member"
    }
  ]
},
{
  "_id": {
    "$oid": "661dd610fda3c080a4f5f02f"
  },
  "user_id": 16,
  "username": "NoraLee",
  "groups": [
    {
      "group_id": "grp002",
      "role": "member"
    }
  ]
}]
''')

# Initialize Faker for generating random data
fake = Faker()

# Define a function to generate random user data
def generate_random_user_data():
    return {
        "first_name": fake.first_name(),
        "last_name": fake.last_name(),
        "country": fake.country(),
        "age": random.randint(18, 80)
    }

# Combine the data based on user_id
combined_data = []
for user in main_json:
    for entry in second_json:
        if user["id"] == entry["user_id"]:
            user_data = {
                "id": user["id"],
                "username": user["username"],
                "email": user["email"],
                "role": user["role"],
                **generate_random_user_data(),  # Add random data
                "groups": entry["groups"]
            }
            combined_data.append(user_data)
            break

# Output the combined data
print(json.dumps(combined_data, indent=4))
