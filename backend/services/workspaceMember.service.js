// Cuando un usuario entra a un workspace como invitado, es decir, se crea una fila en la tabla workspaceMember
// Entonces se hace una consulta a redis para guardar los ids de los workspaces donde el usuario es un guest
// Pero estos ids guardarlos en una clave diferente donde especifique es son los wkpcs donde este es un guest
