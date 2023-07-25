class draggable {
	get = {
		Tabs: () => cy.get('[class="nav nav-tabs"]'),
		TabSimple: () => cy.get('[id="draggableExample-tab-simple"]'),
		DragMe: () => cy.get('[id="dragBox"]'),
		TabAxisRestricted: () => cy.get('[id="draggableExample-tab-axisRestriction"]'),
		OnlyX: () => cy.get('[id="restrictedX"]'),
		OnlyY: () => cy.get('[id="restrictedY"]'),
		TabContainerRestricted: () => cy.get('[id="draggableExample-tab-containerRestriction"]'),
		ContainedInTheBox: () => cy.get('[class="draggable ui-widget-content ui-draggable ui-draggable-handle"]').eq(0),
		TabCursorStyle: () => cy.get('[id="draggableExample-tab-cursorStyle"]'),
	};

	SelectTabSimple() {
		this.get.TabSimple().click();
	}

	MoveDragMe(X, Y) {
		this.get.DragMe().move({ deltaX: X, deltaY: Y });
	}

	SelectTabAxisRestricted() {
		this.get.TabAxisRestricted().click();
	}

	MoveOnlyX(X) {
		this.get.OnlyX().move({ deltaX: X, deltaY: 0 });
	}

	MoveOnlyY(Y) {
		this.get.OnlyY().move({ deltaX: 0, deltaY: Y });
	}

	SelectTabContainerRestricted() {
		this.get.TabContainerRestricted().click();
	}

	MoveContainedInTheBox(X, Y) {
		this.get.ContainedInTheBox().move({ deltaX: X, deltaY: Y });
	}

	SelectTabCursorStyle() {
		this.get.TabCursorStyle().click();
	}
}

export const Draggable = new draggable();
