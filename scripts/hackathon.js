var Hackathon = {
    Models: {},
    Requests: {}
};

Hackathon.Models.Item = function(props) {
    var self = this;
    self.id = props.id || -1;
    self.name = props.name || "";
    self.price = props.price || 0;
};

Hackathon.Models.ItemOrder = function(props) {
    var self = this;
    self.id = props.idItem || -1;
    self.quantity = props.quantity || 0;
};

Hackathon.Models.Order = function(props) {
    var self = this;
    self.orderedItems = props.orderedItems;
};

Hackathon.View = function(props) {
    var self = this;
    self.menu = props.items;
};

Hackathon.Requests.getItems = function(success) {
    var xmlRequest = new XMLHttpRequest();

    xmlRequest.onreadystatechange = function(){
        if(xmlRequest.readyState == 4) {
            if(xmlRequest.status == 200) {
                success(JSON.parse(xmlRequest.responseText));
            } else {
                alert(xmlRequest.responseText);
            }
        }
    };

    xmlRequest.open("GET", "http://hackathongreenmile.herokuapp.com/item", true);
    xmlRequest.send(null);
};

Hackathon.Requests.orderItems = function(order) {
    var xmlRequest = new XMLHttpRequest();

    xmlRequest.onreadystatechange = function(){
        if(xmlRequest.state == 4 && xmlRequest.status == 200){
            success(xmlRequest.responseText);
        } else {
            error(xmlRequest.responseText);
        }
    };

    xmlRequest.open("POST", "http://hackathongreenmile.herokuapp.com/item", true);
    xmlRequest.send(null);
};

Hackathon.init = function(){
    Hackathon.Requests.getItems(function(items){
        var elMenu = document.getElementById("menuData");

        items.forEach(function(item) {
            var elTr = document.createElement("tr");

            var elTdId = document.createElement("td");
            var elSpanId = document.createElement("span");
            elSpanId.innerText = item.name;
            elTdId.appendChild(elSpanId);
            elTr.appendChild(elTdId);

            var elTdAmount = document.createElement("td");
            var elInputAmount = document.createElement("input");
            elInputAmount.type = "number";
            elInputAmount.value = 0;
            elTdAmount.appendChild(elInputAmount);
            elTr.appendChild(elTdAmount);

            var elTdPrice = document.createElement("td");
            var elSpanPrice = document.createElement("span");
            elSpanPrice.innerText = item.price;
            elTdPrice.appendChild(elSpanPrice);
            elTr.appendChild(elTdPrice);

            var elTdInclude = document.createElement("td");
            var elIncludeCheck = document.createElement("input");
            elIncludeCheck.type = "checkbox";
            elTdInclude.appendChild(elIncludeCheck);
            elTr.appendChild(elTdInclude);

            elMenu.appendChild(elTr);
        });
    });
}

function init() {
    Hackathon.init()
}
