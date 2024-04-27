# Generated by Django 5.0.3 on 2024-04-26 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0014_student_batch'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chats',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(max_length=255)),
                ('sender_id', models.IntegerField()),
                ('message', models.TextField()),
                ('time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
