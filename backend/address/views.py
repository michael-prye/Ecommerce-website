from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


from .models import Address
from .serializers import AddressSerializer

@api_view(['GET','POST','DELETE'])
@permission_classes([IsAuthenticated])
def address_list(request):

    if request.method == "GET":
        queryset = Address.objects.filter(user_id=request.user.id)
        
        serializer = AddressSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == "POST":
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        address_id = request.query_params.get('id')
        queryset = get_object_or_404(Address, id =address_id)
        queryset.delete()
        return Response(status=status.HTTP_202_ACCEPTED)





    
