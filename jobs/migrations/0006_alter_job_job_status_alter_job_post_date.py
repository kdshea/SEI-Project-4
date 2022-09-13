# Generated by Django 4.1.1 on 2022-09-13 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0005_job_company_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='job_status',
            field=models.CharField(choices=[('Saved', 'Saved'), ('Applied', 'Applied'), ('Interview', 'Interview'), ('Offer', 'Offer'), ('Declined', 'Declined')], default='Saved', max_length=100),
        ),
        migrations.AlterField(
            model_name='job',
            name='post_date',
            field=models.DateField(blank=True, default=None),
        ),
    ]
