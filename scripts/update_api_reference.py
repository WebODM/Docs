#!/usr/bin/env python3
"""
Fetch swagger.json from a local server and rename API endpoints to be more readable.
"""

import requests
import json
import re

# Define overrides for specific operationIds that need custom names
overrides = {
    "admin_profiles_update_quota_deadline": "Update Quota Deadline",
    "admin_profiles_used_quota": "Used Quota",
    "token-auth_create": "Create Auth Token",
    "projects_tasks_backup_list": "Get Tasks Backup"
}

def convert_operation_id_to_title(operation_id):
    """
    Convert an operation_id like 'presets_create' to 'Create Preset'.
    
    Examples:
        presets_create -> Create Preset
        presets_update -> Update Preset
        projects_tasks_read -> Read Task
        projects_tasks_list -> List Tasks
    """
    # Split by underscore
    parts = operation_id.split('_')
    
    if len(parts) < 2:
        return operation_id.title()
    
    # Last part is usually the action (create, update, read, list, delete, etc.)
    action = parts[-1]
    # Everything before is the resource
    resource_parts = parts[:-1]
    
    # Handle plurals - if action is not 'list', singularize the last resource part
    if action != 'list' and resource_parts:
        resource = ' '.join(word.capitalize() for word in resource_parts[:-1])
        last_part = resource_parts[-1].capitalize()
        if last_part.endswith('s') and len(last_part) > 1:
            last_part = last_part[:-1]
        resource = f"{resource} {last_part}".strip()
    else:
        resource = ' '.join(word.capitalize() for word in resource_parts)
    
    # Capitalize action
    action = action.capitalize()
    
    result = f"{action} {resource}".strip()

    # Manual replacements for special cases
    result = result.replace("Processingnode", "Processing Node")
    result = result.replace("Partial", "")
    result = result.replace("(partial)", "")
    result = result.replace("Projects Task", "Task")
    result = result.replace("Media Manage", "Media")
    result = result.replace("Read Workers", "Workers")
    result = result.replace("Permissions Project", "Permissions")
    result = result.replace("Permissions Project", "Permissions")
    
    return result.strip()


def analyze_swagger(swagger_data):
    """Analyze swagger.json and create a mapping dictionary."""
    mappings = {}
    
    for path, methods in swagger_data.get('paths', {}).items():
        for method, operation in methods.items():
            if isinstance(operation, dict) and 'operationId' in operation:
                operation_id = operation['operationId']
                suggested_name = convert_operation_id_to_title(operation_id)
                mappings[operation_id] = suggested_name
    
    return mappings


def apply_mappings(swagger_data, mappings):
    """Apply the mappings to the swagger data."""
    for path, methods in swagger_data.get('paths', {}).items():
        for method, operation in methods.items():
            if isinstance(operation, dict) and 'operationId' in operation:
                operation_id = operation['operationId']
                if operation_id in mappings:
                    operation['summary'] = mappings[operation_id]
    
    return swagger_data


def main():
    # Fetch swagger.json
    url = "http://localhost:8000/swagger?format=openapi"
    print(f"Fetching swagger.json from {url}...")
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        swagger_data = response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching swagger.json: {e}")
        return
    
    # Analyze and create mappings
    print("\nAnalyzing swagger.json and creating mappings...")
    mappings = analyze_swagger(swagger_data)
    
    # Apply overrides
    if overrides:
        print("Applying overrides...")
        mappings.update(overrides)

    # Display mappings for user review
    print("\n" + "="*60)
    print("PROPOSED MAPPINGS (edit the overrides dictionary to make changes):")
    print("="*60)
    
    # Create a nicely formatted dictionary that users can edit
    print("\nmappings = {")
    for operation_id, suggested_name in sorted(mappings.items()):
        print(f'    "{operation_id}": "{suggested_name}",')
    print("}\n")
    
    # Apply mappings
    print("Applying mappings to swagger.json...")
    updated_swagger = apply_mappings(swagger_data, mappings)
    
    # Save to file
    output_file = "./swagger.json"
    print(f"Saving updated swagger.json to {output_file}...")
    
    with open(output_file, 'w') as f:
        json.dump(updated_swagger, f, indent=2)
    
    print(f"\n✓ Successfully saved updated swagger.json to {output_file}")
    print(f"  Total endpoints updated: {len(mappings)}")


if __name__ == "__main__":
    main()