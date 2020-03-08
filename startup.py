import os
# Make sure you're using venv before running this
# Basically starts up Django and React
# Kills Python if there's a KeyboardInterrupt

try:
	os.chdir('backend/')
	os.system('python manage.py runserver &')
	os.chdir('../frontend/')
	os.system('npm start')
	os.chdir('../')
except KeyboardInterrupt:
	os.system('killall python')