from django.db import models


class History(models.Model):
    operation = models.CharField(max_length=255)
    result = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        app_label = "history"
        verbose_name = "Operations and results history"

    def __str__(self):
        return self.operation + '' + self.result
