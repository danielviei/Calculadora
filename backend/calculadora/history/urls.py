from django.urls.conf import path, include
from . import views

# router = routers.DefaultRouter()
# router.register(
#     r'history',
#     views.HistoryViewSet,
# )

urlpatterns = [
    path(r"history", views.HistoryViewSet.as_view())
]
