import Guitar from "./Components/guitar";
import Header from "./Components/Header";
import { useState, useEffect } from "react";
import { db } from "./data/db";

function App() {

  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  //* Añadir productos al carrito
  function addToCart(item) {

    // Comprueba si ya existe ese item en el carrito
    const itemExist = cart.findIndex( guitar => guitar.id === item.id);

    if ( itemExist < 0 )
    {

      

      // Agrega el item al carrito, si no existe en el carrito
      item.quantity = 1;
      setCart([...cart, item]);
    
    }else {
    
      // Limita la cantidad del item a añadir
      if ( cart[itemExist].quantity >= 5) return

      // Incrementa la cantidad del item, si ya existe en el carrito
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++
      setCart(updatedCart);

    }

  }

  //* Eliminar productos del carrito
  function removeFromCart(id) {

    // Filtra las guitarras en el carrito cuyo id sea diferente al que se le pasa a la funcion
    setCart( prevCart => prevCart.filter(guitar => guitar.id !== id) ) 
  
  }

  //* Incrementa la cantidad de un producto
  function increaseQuantity(id) {

    // Crea una copia del carrito he itera sobre ella
    const updatedCart = cart.map( item => {

      // Si el item coincide con el id, incrementa la cantidad de ese item en 1
      if(item.id === id && item.quantity < 5)
      {

        return{
          ...item,
          quantity: item.quantity + 1
        }

      }

      // Mantiene los demas elementos
      return item
    })

    // Setea el carrito
    setCart(updatedCart);
  
  }


  //* Decrementa la cantidad de un producto
  function decreaseQuantity(id) {

    // Crea una copia del carrito he itera sobre ella
    const updatedCart = cart.map( item => {

      // Si el item coincide con el id, decrementa la cantidad de ese item en 1
      if(item.id === id && item.quantity > 1)
      {

        return{
          ...item,
          quantity: item.quantity - 1
        }

      }

      // Mantiene los demas elementos
      return item
    })

    // Setea el carrito
    setCart(updatedCart);
  
  }


  return (
    <>

      <Header
        cart = { cart }
        removeFromCart = { removeFromCart }
        increaseQuantity = { increaseQuantity }
        decreaseQuantity= { decreaseQuantity }
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {

            // Itera sobre cada objeto de la DB
            data.map( (guitar) => (  
              
              <Guitar
                key={guitar.id}
                guitar = {guitar}
                setCart = {setCart}
                addToCart = {addToCart}
              /> 
            
            ))
          }
        </div>

      </main>


      <footer className="bg-dark mt-5 py-5">
        
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      
      </footer>
    </>
  )
}

export default App
