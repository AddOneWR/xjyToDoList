# coding:utf-8
from django.db import models
# from pygments.lexers import get_all_lexers
# from pygments.styles import get_all_styles


# LEXERS = [item for item in get_all_lexers() if item[1]]
# LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
# STYLE_CHOICES = sorted((item, item) for item in get_all_styles())


class Snippet(models.Model):

    # 定义该模型的字段及相应的类型
    text = models.CharField(max_length=32, default='') 
    level = models.CharField(max_length=5, default='') 
    time = models.CharField(max_length=32, default='') 

    class Meta:
        ordering = ('id',)
