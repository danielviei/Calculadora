from django_filters import rest_framework as filters
from .models import History


class HistoryFilter(filters.FilterSet):
    min_date = filters.DateTimeFilter(field_name='created', lookup_expr='gte')
    max_date = filters.DateTimeFilter(field_name='created', lookup_expr='lte')

    class Meta:
        model = History
        fields = "__all__"
