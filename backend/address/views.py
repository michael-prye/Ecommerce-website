from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response

from .models import Address
from .serializers import AddressSerializer

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def address_list(request):

    if request.method == "GET":
        queryset = Address.objects.all()
        queryset = queryset.filter(user_id=request.user.id)
        serializer = AddressSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == "POST":
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




    
