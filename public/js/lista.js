// TEMPLATE 
// <tr>
//   <td>001</td>
//   <td>user</td>
//   <td>a@a</td>
//   <td>10</td>
//   <td>10</td>
//   <td>
//     <button class="btn btn-primary me-2">Atualizar</button>
//     <button class="btn btn-danger">Remover</button>
//   </td>
// </tr>

const tabela = document.getElementById("lista");

mostrarUsuarios()

function removerUsuario(id) {
    fetch(`/delete/user/${id}`, { method: 'DELETE' })
    mostrarUsuarios();
}

function mostrarUsuarios() {
    for (let i = tabela.rows.length - 1; i >= 0; i--) {
        tabela.deleteRow(i);
    }

    fetch('/json/users')
        .then(res => res.json())
        .then(data => {
            for (const usuario of data) {
                const btnAtualizar = document.createElement('button');
                btnAtualizar.classList = 'btn btn-primary me-2';
                btnAtualizar.innerText = 'Atualizar';

                const btnRemover = document.createElement('button');
                btnRemover.classList = 'btn btn-danger';
                btnRemover.innerText = 'Remover';
                btnRemover.addEventListener('click', () => removerUsuario(usuario.id));

                const tr = tabela.insertRow();
                tr.insertCell(0).innerText = usuario.id;
                tr.insertCell(1).innerText = usuario.nome;
                tr.insertCell(2).innerText = usuario.email;
                tr.insertCell(3).innerText = usuario.sexo;
                tr.insertCell(4).innerText = usuario.dataNasc;

                const coluna5 = tr.insertCell(5);
                coluna5.appendChild(btnAtualizar);
                coluna5.appendChild(btnRemover);
            }
        });
}