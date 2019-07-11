from django.shortcuts import render

def user_info(request):
    return render(request,"personal_center_info.html")

def user_verify(request):
    return render(request, "personal_center_verify.html")

def user_message_system(request):
    return render(request, "user_message_system.html")

def user_message_friend(request):
    return render(request, "user_message_friend.html")