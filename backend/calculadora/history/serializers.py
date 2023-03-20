from rest_framework import serializers
from .models import History


class HistorySerializzer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ('operation', 'created', 'modified', 'result', 'id')
