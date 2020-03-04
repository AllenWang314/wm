import os
# Make sure you're using venv
os.chdir('backend/')
os.system('python manage.py runserver &')
os.chdir('../frontend/')
os.system('npm start')
os.chdir('../')