class Form{
    constructor(){
        this.nameDiv = createDiv();
        this.nameDiv.id('nameDiv');
        this.nameDiv.html('Your Drawing\'s name');
            this.nameInput = createInput();
            this.nameInput.parent('#nameDiv');
            this.nameInput.attribute('placeholder','name');
            let title = createElement('h2','Let\s Paint!');
                title.position(270,0);
                title.parent('#nameDiv');

        this.toolsDiv = createDiv();
        this.toolsDiv.id('toolsDiv');
        let palette = createElement('i');
            palette.class('fas fa-palette');
            palette.parent('#toolsDiv');
            palette.position(15,15);
        let brush = createElement('i');
            brush.class('fas fa-brush');
            brush.parent('#toolsDiv');
            brush.position(15,60);
        let save = createElement('i');
            save.class('fas fa-save');
            save.parent('#toolsDiv');
            save.id('save');
            save.position(16,105);
            save.mousePressed(this.checkData);
        let erase = createElement('i');
            erase.class('fas fa-eraser');
            erase.parent('#toolsDiv');
            erase.id('eraser');
            erase.position(15,155);
            erase.mousePressed(()=>drawArr=[]);
        let download = createElement('i');
            download.class('fas fa-download');
            download.parent('#toolsDiv');
            download.position(15,205);
            download.mousePressed(()=>{
                let canvasUrl = this.canvas.elt.toDataURL();
                let tmpLink = createElement('a');
                if(this.nameInput.value() !== "")
                    tmpLink.elt.download = this.nameInput.value()+".png";
                else
                    tmpLink.elt.download = "image.png";
                tmpLink.elt.href = canvasUrl;
                tmpLink.elt.click();
                tmpLink.remove();
            })
        this.strokeColor = createColorPicker('black');
            this.strokeColor.class('elemts');
            this.strokeColor.parent('#toolsDiv');
            this.strokeColor.position(50,10);
        this.strokeWeight = createSlider(1,10,1,1);
            this.strokeWeight.class('elemts');
            this.strokeWeight.parent('#toolsDiv');
            this.strokeWeight.position(50,60);
        let label = createElement('label','Erase');
            label.parent('#toolsDiv');
            label.attribute('for','eraser');
            label.class('elemts');
            label.position(50,155);
        let label2 = createElement('label','Save');
            label2.parent('#toolsDiv');
            label2.attribute('for','#save');
            label2.class('elemts');
            label2.position(50,105);
        let label3 = createElement('label','Export');
            label3.parent('#toolsDiv');
            label3.class('elemts');
            label3.position(50,205);
        this.canvas = createCanvas(600,400);
        this.canvas.class('canvas');
    }
    checkData(){
        if(form.nameInput.value() == ""){
            alert('Please give a name');
            form.nameInput.elt.focus();
            return 0;
        }
        form.submitData();
        return true;
    }
    submitData(){
        database.ref('drawings/'+this.nameInput.value()).set({
            name: this.nameInput.value(),
            drawing: drawArr
        });
    }
    getData(){
        database.ref('drawings').on('value',(data)=>drawingData=data.val(),errData);
    }
}