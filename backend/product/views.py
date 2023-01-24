from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Product, Category, ProductImage
from .serializers import ProductSerializer, CategorySerializer, ImageSerializer

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def product_category(request):
    if request.method == "POST":
        serializer=CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == "GET":
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def product_list(request):
    if request.method == 'GET':
        product_id = request.query_params.get('product')
        category_id = request.query_params.get('category')

        if product_id:
            queryset = Product.objects.filter(id=product_id)
            serializer = ProductSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif category_id:
            queryset = Product.objects.filter(category=category_id)
            serializer = ProductSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            queryset = Product.objects.all()
            serializer = ProductSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        category_id = request.query_params.get('id')
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(category_id=category_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def product_image(request):
    if request.method == 'GET':
        product_id = request.query_params.get('product')
        if product_id:
            queryset = ProductImage.objects.filter(product=product_id)
            serializer = ImageSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method=='POST':
        product_id = request.query_params.get('product')
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(product_id=product_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






        
        
