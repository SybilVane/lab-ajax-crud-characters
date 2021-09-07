const charactersAPI = new APIHandler('https://minions-api.herokuapp.com');

window.addEventListener('load', () => {
  document
    .getElementById('fetch-all')
    .addEventListener('click', function (event) {
      charactersAPI
        .getFullList()
        .then(response => {
          let text = '';
          response.data.reverse().forEach(
            minion =>
              (text += `<div class="character-info">
       <div class="name"> ID: ${minion.id}</div>
        <div class="name"> Name: ${minion.name}</div>
        <div class="occupation">Occupation: ${minion.occupation}</div>
        <div class="cartoon">Cartoon: ${minion.cartoon}</div>
        <div class="weapon">Weapon: ${minion.cartoon}</div>
      </div>`)
          );
          document.querySelector('.characters-container').innerHTML = text;
        })
        .catch(err => console.log('ERROR', err));
    });

  document
    .getElementById('fetch-one')
    .addEventListener('click', function (event) {
      const valueId = document.querySelector('.character-id').value;

      charactersAPI
        .getOneRegister(valueId)
        .then(response => {
          let text = '';
          const minion = response.data;
          text += `<div class="character-info">
           <div class="name"> ID: ${minion.id}</div>
            <div class="name"> Name: ${minion.name}</div>
            <div class="occupation">Occupation: ${minion.occupation}</div>
            <div class="cartoon">Cartoon: ${minion.cartoon}</div>
            <div class="weapon">Weapon: ${minion.cartoon}</div>
          </div>`;
          document.querySelector('.characters-container').innerHTML = text;
        })
        .catch(err => {
          console.log('ERROR', err);
          document.querySelector('#fetch-one').classList = 'err';
          setTimeout(() => {
            document.querySelector('#fetch-one').classList.remove('err');
          }, 500);
        });
    });

  document
    .getElementById('delete-one')
    .addEventListener('click', function (event) {
      const valueId = document.querySelector('.character-id-delete').value;

      charactersAPI
        .deleteOneRegister(valueId)
        .then(response => {
          // si lo siguiente no se considera una forma espectacular de resolverlo, me retiro del bootcamp JAJAJAJAJA!!!
          const minionId = response.data.id;
          if (typeof minionId === 'number') {
            let text = `<div class="character-info"> MINION DELETED!
          </div>`;
            document.querySelector('.characters-container').innerHTML = text;
            document.querySelector('#delete-one').classList = 'success';

            setTimeout(() => {
              document.querySelector('#delete-one').classList.remove('success');
            }, 500);
          }
        })
        .catch(err => {
          console.log('ERROR', err);
          document.querySelector('#delete-one').classList = 'err';
          setTimeout(() => {
            document.querySelector('#delete-one').classList.remove('err');
          }, 500);
        });
    });

  document
    .getElementById('edit-character-form')
    .addEventListener('submit', function (event) {
      event.preventDefault();

      const inputs = document.querySelectorAll('#edit-character-form input');

      const character = {
        id: inputs[0].value,
        name: inputs[1].value,
        occupation: inputs[2].value,
        weapon: inputs[3].value,
        cartoon: inputs[4].checked,
      };

      charactersAPI
        .updateOneRegister(character.id, character)
        .then(response => {
          const minionId = response.data.id;
          if (typeof minionId === 'number') {
            document.querySelector('#edit-character-form').reset();
            document.querySelector('#update-data').classList = 'success';

            setTimeout(() => {
              document
                .querySelector('#update-data')
                .classList.remove('success');
            }, 500);
          }
        })
        .catch(err => {
          console.error('ERROR', err);
          document.querySelector('#update-data').classList = 'err';
          setTimeout(() => {
            document.querySelector('#update-data').classList.remove('err');
          }, 500);
        });
    });

  document
    .getElementById('new-character-form')
    .addEventListener('submit', function (event) {
      event.preventDefault();

      const inputs = document.querySelectorAll('#new-character-form input');
      const character = {
        name: inputs[0].value,
        occupation: inputs[1].value,
        weapon: inputs[2].value,
        cartoon: inputs[3].checked,
      };

      charactersAPI
        .createOneRegister(character)
        .then(() => {
          document.querySelector('#new-character-form').reset();
          document.querySelector('#send-data').classList = 'success';

          setTimeout(() => {
            document.querySelector('#send-data').classList.remove('success');
          }, 500);
        })
        .catch(err => {
          console.error('ERROR', err);
          document.querySelector('#send-data').classList = 'err';
          setTimeout(() => {
            document.querySelector('#send-data').classList.remove('err');
          }, 500);
        });
    });
});
