from rest_framework import generics
from .serializers import HistorySerializzer
from .models import History
from . import filters
from django_filters.rest_framework import DjangoFilterBackend


class HistoryViewSet(generics.ListCreateAPIView):
    queryset = History.objects.all()
    serializer_class = HistorySerializzer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = filters.HistoryFilter
