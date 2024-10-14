package inventory

type Inventory struct {
	items map[int]Item
}

func NewInventory() *Inventory {
	return &Inventory{items: make(map[int]Item)}
}

func (inv *Inventory) AddItem(item Item)  {
	inv.items[item.ID] = item
}

func (inv *Inventory) RemoveItem(id int){
	delete(inv.items,id) 
}

func (inv *Inventory) GetItems() []Item  {
	itemList := make([]Item,0,len(inv.items))
	for _, item:= range inv.items{
		itemList = append(itemList, item)
	}	
	return itemList
}