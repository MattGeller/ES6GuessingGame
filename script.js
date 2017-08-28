$(document).ready(function () {
    console.log("Document ready called!");
    init();
});

function init() {
    console.log("init called!");
    view.assignClickHandlers();
}

class View {
    constructor() {
    }

    assignClickHandlers() {
        $('#submit_button').on('click', this.submitButtonClick.bind(this));
        $(document).keypress(function(e){
            if (e.which ===13){
                this.submitButtonClick();
            }
        }.bind(this));
    }

    getNumberFromInput() {
        let userInput = $("#input_field").val();
        if (userInput || userInput === 0)
            return userInput;
    }

    submitButtonClick() {
        //this this has been bound, so it refers to the instance of View, rather than referring to the calling element
        let textFromComparison = model.compareNumber(this.getNumberFromInput());
        $('#submit_button').text(textFromComparison);
        if (textFromComparison !== "Winner") {
            //highlight the text input field to easily plug in a new number
            $("#input_field").select();
        } else {
            //victoryModal!
            console.log("modal should show up now.");
            $("#victoryModal").modal('toggle');
        }
    }

}

class Model {
    constructor(minParam = 0, maxParam = 10) {
        this.min = minParam;
        this.max = maxParam;
        this.hiddenNum = this.pickNumber();
    }

    pickNumber() {
        return Math.floor(Math.random() * (this.max - this.min + 1) + this.min)
    }

    compareNumber(inputNum) {
        let outStr = "";
        let outerRadius = Math.round((this.max - this.min) * 0.8);
        let innerRadius = Math.round((this.max - this.min) * 0.2);
        let difference = inputNum - this.hiddenNum;

        if (difference === 0) {
            return "Winner";
        }

        if (difference > 0) {
            outStr += "Too High"
        } else {
            outStr += "Too Low"
        }

        if (Math.abs(difference) > outerRadius) {
            outStr = "Way " + outStr + '!';
        } else if (Math.abs(difference) < innerRadius)
            outStr = "A Little " + outStr;
        return outStr;
    }
}

var model = new Model();
var view = new View();
