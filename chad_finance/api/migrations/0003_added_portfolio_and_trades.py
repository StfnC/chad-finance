# Generated by Django 3.1.6 on 2021-03-12 01:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_added_is_staff'),
    ]

    operations = [
        migrations.CreateModel(
            name='Portfolio',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creation_date', models.DateField(auto_now_add=True)),
                ('owner', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Trade',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('symbol', models.CharField(max_length=5)),
                ('buy_price', models.DecimalField(decimal_places=4, max_digits=25)),
                ('buy_date', models.DateTimeField(auto_now_add=True)),
                ('quantity', models.DecimalField(decimal_places=2, max_digits=50)),
                ('portfolio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.portfolio')),
            ],
        ),
    ]
