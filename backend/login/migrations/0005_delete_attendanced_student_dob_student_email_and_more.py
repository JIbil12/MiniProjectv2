# Generated by Django 5.0.3 on 2024-04-01 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0004_attendanced'),
    ]

    operations = [
        migrations.DeleteModel(
            name='AttendanceD',
        ),
        migrations.AddField(
            model_name='student',
            name='dob',
            field=models.DateField(default='1900-01-01'),
        ),
        migrations.AddField(
            model_name='student',
            name='email',
            field=models.EmailField(default='example@example.com', max_length=254),
        ),
        migrations.AddField(
            model_name='student',
            name='phone',
            field=models.CharField(default='000-000-0000', max_length=15),
        ),
        migrations.AddField(
            model_name='student',
            name='sem',
            field=models.IntegerField(default=1),
        ),
    ]
