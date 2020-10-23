<script>
  import Velocity from "velocity-animate";

  let dice = [
    { sides: 4, count: 0, active: false },
    { sides: 6, count: 0, active: false },
    { sides: 8, count: 0, active: false },
    { sides: 10, count: 0, active: false },
    { sides: 12, count: 0, active: false },
    { sides: 20, count: 0, active: false },
  ];
  let sumOptions = [
    { id: 0, text: "Don't Sum" },
    { id: 1, text: "Sum By Type" },
    { id: 2, text: "Sum All" },
  ];
  let selectedSumOption;
  let result = "";

  const rollDie = (sides) => Math.floor(Math.random() * sides) + 1;

  const addDie = (index) => {
    dice[index].count++;
    dice[index].active = true;
    dice = [...dice];
  };

  const removeDie = (index) => {
    if (dice[index].count > 0) {
      dice[index].count--;
    }

    if (dice[index].count === 0) {
      dice[index].active = false;
    }

    dice = [...dice];
  };

  const resetDice = () => {
    dice.forEach((die, index) => {
      dice[index].count = 0;
      dice[index].active = false;
    });
  };

  const roll = () => {
    switch (selectedSumOption.id) {
      case 0:
        result = noSumRoll();
        break;
      case 1:
        result = sumByTypeRoll();
        break;
      case 2:
        result = sumAllRoll();
        break;
    }
    setTimeout(() => grow({ target: document.getElementById("wrapper") }), 50);
  };

  const noSumRoll = () => {
    let activeDice = dice.filter((x) => x.active);
    let rollString = "";

    activeDice.forEach((die) => {
      rollString += `d${die.sides}: `;
      for (let i = 0; i < die.count; i++) {
        let dieResult = rollDie(die.sides);
        rollString += dieResult;
        rollString += die.count - i != 1 ? ", " : "";
      }
      rollString += "<br />";
    });

    return rollString;
  };

  const shrink = (event) => {
    let elements = document.getElementsByClassName("die-count");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.visibility = "hidden";
    }
    Velocity(
      event.target,
      { height: "100px", width: "100px" },
      { duration: 200 }
    );
  };

  const grow = (event) => {
    let elements = document.getElementsByClassName("die-count");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.visibility = "inherit";
    }
    Velocity(
      event.target,
      {
        height: document.getElementById("roller").clientHeight,
        width: "600px",
      },
      { duration: 200 }
    );
  };
</script>

<style lang="scss">
  @import "bulma/bulma.sass";

  .wrapper {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.445);
    width: 100px;
    height: 100px;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
  }

  .die-count {
    visibility: hidden;
  }

  .roller {
    padding: 0.5rem;
    width: 600px;
    height: auto;
    position: absolute;
    top: 0;
    right: 0;
  }

  img {
    width: 75px;
    height: auto;
  }

  .die-count {
    width: 75px;
    text-align: center;
    display: flex;
    justify-content: space-around;
    user-select: none; /* standard syntax */
    -webkit-user-select: none; /* webkit (safari, chrome) browsers */
    -moz-user-select: none; /* mozilla browsers */
    -khtml-user-select: none; /* webkit (konqueror) browsers */
    -ms-user-select: none; /* IE10+ */
  }

  .die-count span {
    cursor: pointer;
  }

  .right {
    text-align: right;
    margin-top: auto;
  }

  select,
  .button {
    vertical-align: middle;
  }
</style>

<template>
  <div class="wrapper" id="wrapper" on:mouseenter={grow} on:mouseleave={shrink}>
    <div class="roller p-2" id="roller">
      <div class="columns">
        {#each dice as die, i}
          <div class="column">
            <img
              class="column"
              src="images/d{die.sides}.png"
              alt="d{die.sides}" />
            <div class="die-count" id={die.sides}>
              <span on:click={() => removeDie(i)}>
                <i class="fas fa-minus" />
              </span>
              {die.count}
              <span on:click={() => addDie(i)}>
                <i class="fas fa-plus" />
              </span>
            </div>
          </div>
        {/each}
      </div>
      <div class="columns is-vcentered">
        <div class="column">
          {@html result}
        </div>
        <div class="column right">
          <button
            class="button is-danger mb-2"
            on:click={resetDice}>Reset</button>
          <form on:submit|preventDefault={roll}>
            <select bind:value={selectedSumOption}>
              {#each sumOptions as option}
                <option value={option}>{option.text}</option>
              {/each}
            </select>
            <button class="button is-primary" type="submit">Roll</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
