# Generated by Django 4.1.1 on 2022-09-16 08:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0013_alter_company_company_url_alter_company_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='founded',
            field=models.IntegerField(blank=True, default=None),
        ),
    ]
