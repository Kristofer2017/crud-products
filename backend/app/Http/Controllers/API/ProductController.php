<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Producto;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Producto::all(), 200);
    }
    
    public function store(Request $request)
    {
        $product = Producto::create($request->all());
        return response()->json($product, 201);
    }

    public function show($id)
    {
        $product = Producto::find($id);
        if(!$product) {
            return response()->json(['message' => 'No hay productos'], 404);
        }
        return response()->json($product, 200);
    }

    public function update(Request $request, $id)
    {
        $product = Producto::find($id);
        if (!$product) {  
            return response()->json(['message' => 'No se encontró el producto'], 404);  
        }  
        $product->update($request->all());
        return response()->json($product, 200);
    }

    public function destroy($id)
    {
        $product = Producto::find($id);     
        if (!$product) {  
            return response()->json(['message' => 'No se encontró el producto'], 404);  
        }  
        $product->delete();  
        return response()->json(['message' => 'Producto eliminado'], 200);  
    }
}
