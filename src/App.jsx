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
    
      // Incrementa la cantidad del item, si ya existe en el carrito
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++
      setCart(updatedCart);

    }
    
    console.log(cart);
    

  }

  return (
    <>

      <Header
        cart = { cart }
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
