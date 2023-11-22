export async function  requestMetas(){
   const response = await fetch('/metas.json');
   const metas = await response.json();
   return metas;
}

export async function  requestMeta(){
    const response = await fetch('/meta.json');
    const meta = await response.json();
    return meta;
}

export async function  createMeta(){
    const response = await fetch('/meta.json');
    const metaCreada = await response.json();
    console.log('Meta Creada!', metaCreada);
    return metaCreada;
}

export async function  updateMeta(){
    const response = await fetch('/meta.json');
    const metaActualizada = await response.json();
    console.log('Meta Actualizada!', metaActualizada);
    return metaActualizada;
}

export async function  deleteMeta(){
    const response = await fetch('/meta.json');
    const metaBorrada = await response.json();
    console.log('Meta Borrada!', metaBorrada.id);
    return response.id;
}

