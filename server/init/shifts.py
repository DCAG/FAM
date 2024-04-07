import json
import random
from datetime import datetime, timedelta

# Function to generate random datetime within a range
def random_date(start, end):
    return start + timedelta(
        seconds=random.randint(0, int((end - start).total_seconds())))

# Function to generate a list of JSON objects
def generate_json_objects(num_objects):
    start_date = datetime(2024, 1, 1)
    end_date = datetime(2024, 2, 28, 23, 59, 59)
    employee_ids = [
        "65e115ec1bf3b969f2e24805", "65e115ec1bf3b969f2e24806",
        "65e115ec1bf3b969f2e24807", "65e115ec1bf3b969f2e24808",
        "65e115ec1bf3b969f2e24809", "65e115ec1bf3b969f2e2480a",
        "65e115ec1bf3b969f2e2480b", "65e115ed1bf3b969f2e2480c",
        "65e115ed1bf3b969f2e2480d", "65e115ed1bf3b969f2e2480e",
        "65e115ed1bf3b969f2e2480f", "65e115ed1bf3b969f2e24810",
        "65e115ed1bf3b969f2e24811", "65e115ed1bf3b969f2e24812",
        "65e115ed1bf3b969f2e24813", "65e115ed1bf3b969f2e24814",
        "65e115ed1bf3b969f2e24815", "65e115ed1bf3b969f2e24816",
        "65e115ed1bf3b969f2e24817", "65e115ed1bf3b969f2e24818",
        "65e115ed1bf3b969f2e24819", "65e115ed1bf3b969f2e2481a",
        "65e115ed1bf3b969f2e2481b", "65e115ed1bf3b969f2e2481c",
        "65e115ed1bf3b969f2e2481d", "65e115ed1bf3b969f2e2481e",
        "65e115ed1bf3b969f2e2481f", "65e115ed1bf3b969f2e24820",
        "65e115ed1bf3b969f2e24821", "65e115ed1bf3b969f2e24822"
    ]
    json_objects = []

    for _ in range(num_objects):
        date = random_date(start_date, end_date).date()
        starting_hour = random.randint(0, 20)
        ending_hour = random.randint(starting_hour + 1, 23)
        assigned_employees = random.sample(employee_ids, random.randint(1, 5))

        json_object = {
            "Date": date.isoformat(),
            "StartingHour": starting_hour,
            "EndingHour": ending_hour,
            "AssignedEmployees": assigned_employees
        }
        json_objects.append(json_object)

    return json_objects

# Generate 50 JSON objects
json_list = generate_json_objects(50)

# Print the JSON list
print(json.dumps(json_list, indent=4))

