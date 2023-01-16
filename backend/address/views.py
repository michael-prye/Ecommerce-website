from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response

from .models import Address
from .serializers import AddressSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_address(request):
    address_id = request.query_parms.get('id')
    queryset = Address.objects.all()

    if address_id:
        queryset = queryset.filter(address_id = address_id)
        serializer = AddressSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        queryset = queryset.filter(user_id=request.user.id)
        serializer = AddressSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
