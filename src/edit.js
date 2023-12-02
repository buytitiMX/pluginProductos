import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const Edit = () => {
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        console.log('Obteniendo ID de la categoría...');
        apiFetch({ path: '/wc/store/products/categories?slug=bocinas' })
            .then((categorias) => {
                const categoryId = categorias[0]?.id;
                if (categoryId) {
                    console.log('ID de la categoría obtenido:', categoryId);

                    console.log('Obteniendo productos...');
                    apiFetch({ path: `/wc/store/products?category=${categoryId}` })
                        .then((data) => {
                            console.log('Productos obtenidos:', data);
                            setProductos(data);
                        });
                } else {
                    console.error('No se pudo obtener el ID de la categoría.');
                }
            });
    }, []);

    // Función para obtener el precio
    const getPrecio = (producto) => {
        if (producto.prices) {
            const { regular_price, sale_price } = producto.prices;
    
            const formatearPrecio = (precio) => {
                return (parseFloat(precio) / 100).toLocaleString('es-MX', {
                    style: 'currency',
                    currency: 'MXN',
                    minimumFractionDigits: 2,
                });
            };
    
            if (sale_price) {
                return (
                    <>
                        <span style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '5px', fontSize: '0.8em' }}>
                            Oferta
                        </span>
                        <div style={{ textDecoration: 'line-through', fontSize: '0.8em', marginRight: '5px' }}>
                            {formatearPrecio(regular_price)}
                        </div>
                        {formatearPrecio(sale_price)}
                    </>
                );
            }
    
            if (regular_price) {
                return formatearPrecio(regular_price);
            }
        }
        return 'Precio no disponible';
    };
    
    // Función para obtener la URL de la imagen de tamaño completo
    const obtenerUrlImagenCompleta = (imagen) => {
        if (imagen && imagen.src) {
            // Elimina cualquier fragmento de tamaño en la URL
            return imagen.src.replace(/-\d+x\d+/, '');
        }
        return null;
    };

    return (
        <div style={{ width: '100%' }}>
            {productos ? (
                productos.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
                        {productos.map((producto) => (
                            <li key={producto.id} style={{ boxSizing: 'border-box', flex: '0 0 20%', maxWidth: '20%', marginBottom: '20px' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={obtenerUrlImagenCompleta(producto.images[0])} alt={producto.name} style={{ width: '100%' }} />
                                    {producto.prices && producto.prices.sale_price && (
                                        <span style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '5px', fontSize: '0.8em' }}>
                                            Oferta
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <h3>{producto.name}</h3>
                                    {getPrecio(producto)}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{__('Cargando Productos', 'mi-plugin')}</p>
                )
            ) : (
                <p>{__('Cargando productos...', 'mi-plugin')}</p>
            )}
        </div>
    );
};

export default Edit;