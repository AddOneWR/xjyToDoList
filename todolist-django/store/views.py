# -*- coding: utf-8 -*-
import json
from django.http import HttpResponse
from django.shortcuts import render

from store.models import List

 
def select_store_list(request):
    store_list = List.objects.all() #查询所有的信息
    print(type(store_list), dir(store_list.__dict__))  #打印结果类型与结果值
    return render(request, "store_list.html", {"content": store_list}) #返回界面
