# fix.py
import subprocess
import tempfile
import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import yaml
from yamllint import linter
from yamllint.config import YamlLintConfig

router = APIRouter()

class YAMLInputValidation(BaseModel):  # Renamed to avoid conflicts
    content: str

@router.post("")
async def lint(yaml_content: YAMLInputValidation):
    """
    Lints the provided YAML string and returns parsed data along with lint results.
    """
    try:
        # First validate that the YAML is parseable
        parsed_yaml = yaml.safe_load(yaml_content.content)
        
        # Perform linting
        lint_results = lint_yaml(yaml_content.content)
        
        return {
            "success": True,
            "parsed_data": parsed_yaml,
            "lint_results": lint_results
        }
    except yaml.YAMLError as e:
        return {
            "success": False,
            "error": f"Invalid YAML content: {str(e)}"
        }
    except Exception as e:
        return {
            "success": False,
            "error": f"Error during processing: {str(e)}"
        }

def lint_yaml(yaml_content: str) -> list:
    """
    Lint the provided YAML string and return errors, if any.
    """
    # Define basic YAML lint configuration
    yaml_config = YamlLintConfig('{extends: default, rules: {line-length: {max: 120}}}')
    
    try:
        # Use yamllint to check the YAML content
        problems = linter.run(yaml_content, yaml_config)
        
        # Convert problems to a list of strings
        lint_results = []
        for problem in problems:
            lint_results.append(f"Line {problem.line}: {problem.desc} (level: {problem.level})")
        
        return lint_results if lint_results else ["No linting issues found."]
        
    except Exception as e:
        return [f"Linting error: {str(e)}"]