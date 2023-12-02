import { __ } from '@wordpress/i18n';

const Save = ({ attributes }) => {
    const { productos } = attributes;

    return (
        <div style={{ width: '100%' }}>
            {productos ? (
                productos.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
                        {productos.map((producto) => (
                            <li key={producto.id} style={{ boxSizing: 'border-box', flex: '0 0 20%', maxWidth: '20%', marginBottom: '20px' }}>
                                {/* Renderizar el contenido del producto aquí */}
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

export default Save;