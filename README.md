# Project repository

This repository contains a Python project using a local virtual environment stored in `python/.venv/`.

## Quick start

If the virtual environment doesn't exist, create it first:

    python3 -m venv python/.venv

Activate the virtual environment (bash):

    source python/.venv/bin/activate

Verify Python is the expected version:

    python --version

Install project dependencies (after populating `requirements.txt`):

    pip install -r python/requirements.txt

To generate or update `requirements.txt` from the virtual environment:

    pip freeze > python/requirements.txt

To add a new dependency and update `requirements.txt`:

    pip install <package>
    pip freeze > python/requirements.txt

Deactivate the virtual environment when finished:

    deactivate

## Notes

- The virtual environment directory `python/myenv/` is included in `.gitignore` so it won't be committed.
- If you need a fresh virtual environment, create one with `python -m venv python/myenv` then activate and install requirements.
- Keep `python/requirements.txt` under version control so others can recreate the environment.

## Troubleshooting

- If `source python/myenv/bin/activate` fails, check that `python/myenv/bin/python` exists and is executable.
- If packages fail to install, try upgrading pip inside the venv: `pip install --upgrade pip`.

---
Generated on 29 October 2025.
