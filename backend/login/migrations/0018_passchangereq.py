# Generated by Django 5.0.3 on 2024-05-06 02:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0017_announcement'),
    ]

    operations = [
        migrations.CreateModel(
            name='PassChangeReq',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pass_change_reqs', to='login.student')),
            ],
            options={
                'verbose_name': 'Password Change Request',
                'verbose_name_plural': 'Password Change Requests',
            },
        ),
    ]
