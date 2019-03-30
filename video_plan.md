# REQUIREMENTS

Let’s get familiar with the requirements.

There’s a screen to make a choice.

There’s another screen to make a choice.

There’s a final step from where we can start the whole flow again.

Depending on the first two choices, there may be an extra step.

---

# ENVIRONMENT


To start building, we are going to need:
- a terminal
- a browser
- and a code editor

The first step is to visit the documentation of Rosmaro at rosmaro.js.org/doc. 

What we can find there is not only a complete documentation, but also many useful links to blogposts, utilities and examples.

We’re going to use the Rosmaro visual editor, which is a tool that allows to draw boxes with arrows that are turned into real, executable code.

And in order to get up and running really quickly, our ticket machine wizard is going to be built on top of a snabbdom starter. It is an example application where all the libraries are already configured and connected with each other.

Making use of the starter is simple.

We just need to clone it, [...] then instal the dependencies, [...] and it’s ready to start .

Now we may open the locally running project in the browser.

In the code editor we can see the source files of our new project.

# THE FIRST SCREEN

Before we jump into the editors, let’s take a look at the requirements one more time to clarify what does the home screen look like.

# reading - start
The zones are selected in the first step.

There are two possible choices: all zones or just the first one.

Then, we ask the customer to choose a tariff: the regular one of the one for students.

In most of he cases, the order is done. We show a screen with a “thank you” message that, when closed, allows to place a new order.

However, if the customer ordered a student ticket valid in all zones, there’s an additional step asking about the means of transport they want to use: all of them or just the buses.

# reading - end

So there’s a screen to select zones and there are two possible options.

Cool! Let’s write a test for that.

We won't need the example test.

Our app is all about orders, so let’s call the test order.test.js.

What’s described by this tests is a flow that starts with the zones screen.

It means that the first step is to see the zones.

The flow function comes from the test/utils/runner file.

The tests steps are going to live in their own files in the steps directory. 

They will be grouped by the screens they interact with.

That’s why we are importing zones from the test/steps/zones file.

This file doesn’t exist yet, so let’s create it.

The first step, called “see”, is actually a collection of three other steps verifying that the following pieces of text are visible on the screen: zones, first, and all.

The “assertVisible” function is imported from the test/steps/assert_visibility file.

If we run the tests by typing npm t in the terminal, they fail, because this flow is not implemented yet.

The implementation starts in the Rosmaro visual editor.

We load a new project.

Then, we add the first node called “main” which is a graph. It’s going to be the main node of our application.

Next, we add a leaf called “Zones”. The code that handles the screen asking to select zones will be associated with this node.

To tell Rosmaro that the application should start in the “Zones” node, we add a node in the “main” graph, […] connect the “start” entry point with it […] and finally we select the underlaying node of the “Zones” node in the “main” graph to be the “Zones” leaf.

We can now generate the code by clicking the “GENERATE CODE” button.

The output lands in the “graph.json” file.

To make some space for the written part of the implementation, that is the code, we need to delete all the folders in the bindings/main directory.

The main/index.js file may stay, because all it does is using the transparentHandler, what’s exactly what we need, that is a transparent node that doesn’t have its own behaviour.

It means that when the current node of the state machine is the “Zones” node, the “main” node behaves exactly like the “Zones” node. It's simply transparent.

To associate some behavior with the “Zones” node, which is a child of the “main” node, we create a “Zones” directory in the “main” directory. The binding, what is a Rosmaro word for the behavior associated with a node, always lives in an index.js file.

The binding file exports a default function of an object that gives us the dispatch function, that is the function used to send actions to the Rosmaro model.

The actual binding is an object that always exposes one property called a “handler”.

Under the hood, the handler is a function of action and context that returns some result, arrows to follow and an updated version of the context.

Fortunately. thanks to the fact that the Rosmaro snabbdom starter uses the rosmaro-binding-utils package, we don’t need to do all that manually.

We can make use of the makeHandler function.

By passing it an object with a RENDER key, we specify how do we want to handle actions where the “type” property equals “RENDER”.

In this case, we’re rendering a div with three children:
- a text node “Select zones”
- a “first” button
- an “all” button”

The h function is a helper function from the snabbdom virtual dom library used to create virtual dom nodes.

It’s configured and exported in the src/utils/vdom file.

The makeHandler function is exported from the src/utils/handlers file.

In order for the recently created Zones/index.js file to be correctly loaded and associated with the graph, we need to create a file mapping code to nodes. 

With the Rosmaro command line utilities it’s really easy - all we need to do is to type npm run Rosmaro-bindings:generate in the terminal. 

As we can see, a file mapping code to nodes has been generated.

Running npm t shows that the test we wrote previously passes.

If we go back to the browser, we will see that instead of the button from the example application we now see the first screen of the ticket vending machine.

The only behavior currently associated with this node is reacting to the RENDER action.

That’s why clicking the buttons has no effect.

# GOING TO THE TARIFFS SCREEN

Dummy buttons are a good start, but our goal is a fully functional wizard.

As we can see in the requirements, the next screen is about tariffs.

The customer needs to pick one of two tariffs: the regular one or the one for students.

Expressing this in the test case is simple.

After the step that asserts that the zones screen is visible, we add steps to select the first zone and then another one to see the tariffs screen.

All the steps regarding tariffs will come from the test/steps/tariffs file, similarly to steps for the zones screen coming from the test/steps/zones file.

Before we create any step for the new screen, let’s extend the zones steps with two new steps:
- one to select all the zones
- another one to select just the first zone

They are all going to use the click step from the test/steps/click file.

To select all zones, we click the button that contains the “all” word.

And to select just the first zone, we click the button that contains the “first”  word.

The steps/tariffs.js file will be very similar to the steps/zones.js file. 

Let’s use it as a template.

When at the “Tariffs” screen, the customer must see the following words: tariffs, regular, and student.

The implementation starts with a drawing.

We will need another leaf for Tariffs.

Let’s add it.

Next, let’s create a node called “Tariffs” in the “main” graph. 

The fact that the user is supposed to land on the Tariffs screen after selecting the zones is expressed with an arrow going from the Zones box to the Tariffs box. 

The arrow is named after an event.

In this case it’s “selected”, what means that a zone has been selected.

The last step before we can update the graph.json file is to specify that it’s the “Tariffs” leaf what’s under the Tariffs node in “main”. 

Currently, the “Zones” node doesn’t follow any arrows.

Let’s attach some behavior to the “first” button.

The object which is passed as the second argument of the h function from snabbdom allows us to attach event handlers.

When the button is clicked,
we want it to call the “dispatch” function with an action that means that the user selected the first zone.

This handler is then extended in such a way that it reacts to the FIRST action by following the “selected” arrow.

The way following an arrow is implemented is very similar to the way rendering is implemented, just instead of returning a virtual dom node, it returns an object with an arrow property set to “selected”.

Now, that the Zones know when to follow the selected arrow, let’s write some  code for the tariffs.

We will reuse what we already have for the Zones.

Just need to put “select your tariff”, “regular” and “student” instead of “Select zones”, “first” and “all”.

For now, we don’t need any event handlers.That’s why we’re commenting them out.

We have defined new nodes and handlers.

That’s why it’s necessary to regenerate the automatically created bindings by running npm run Rosmaro-bindings:generate again.

Now the tests pass.

Also, as we can see in the browser, it’s possible to go from the zones screen to the tariffs screen.

# COMPLETING THE FIRST FLOW

To complete the first flow, we need to build a “thank you” message.

There must be a way to close it, like a “close” button, that takes the user back to “zones”.

The list of steps may be extended in the following way:
- after seeing the tariffs screen, we pick the regular tariff
- then, we see the thank you message
- after closing the message, we see zones again

The only new screen here is the thanks screen.

We are going to put all steps related to this screen in a dedicated file, similarly to how we did it for zones and tariffs.

To express such a flow in the graph, we will need a new leaf - Thanks.

Then, we add it to the “main” graph.

It’s important not to forget about selecting the underlaying node.

Afterwards, we draw an arrow from Tariffs to Thanks and call it “selected”.

Because we want the user to be able to go back to the beginning, we connect Thanks with Zones with a “close” arrow.

It means that when the user closes the “thank you” message, they land on the Zones screen.

In order to be able to test what happens after a tariff is selected, we need to implement tests steps for that.

So, to pick the regular tariff means to click the “regular” button.

Similarly, the student tariff is selected by clicking the “student” button.

The thanks screen is supposed to render a “thank you” message and a “close” button.

Closing this screen means clicking the “close” button. 

Good. It’s time to jump into the code.

The tariffs screen is lacking event handlers.

Now we already know that we want to follow the “selected” arrow when the “regular” button is clicked.

The "thank you" step simply displays a message and allows to click a button that follows the “close” arrow.

Just to make sure we didn’t make any mistakes, let’s run the tests.

Yay! All green!

Now we can go though the whole flow:
- from zones to tariffs
- from tariffs to thanks
- from thanks back to zones 

# SIMILAR FLOWS

The minimal version of the first flow is ready.

Let’s see if it works when instead of selecting the first zone the user selects all zones.

Unfortunately, it doesn’t work yet.

It fails because there’s no event listener assigned to the button that’s supposed to select all zones.

Let’s fix that.

Clicking this button dispatches an action type ALL.

Consuming this action follows the “selected” arrow.

Now, both of our tests pass.

We can try it out in the browser as well.

Another similar flow
 we may want to test
 is a student ticket for the first zone.

As we can see, it doesn’t work neither.

It’s because there’s no event handler to select the student tariff.

We are going to fix it in a very similar way - by dispatching and then reacting to an action.

That action makes the node follow the “selected” arrow. 

Success! Tests are passing.

And we can test it in the browser as well.

It’s time to handle the most challenging flow.

As we can see in the requirements, depending on what did the customer select on the first two screens, there may be an extra screen before we go to the thank you message.

This kind of situation would normally be programmed with some sort of boolean value based logic, like an IF expression inspecting the data left by the previous screens.

But modeling the business logic with boolean values may quickly turn into error prone hacking with IFs.

Fortunately, the automata-based programming paradigm gives us a lot cleaner, easy to understand solution.

We’re simply going to draw multiple paths in the graph.

To draw paths dependent on decision made when in the “Zones” and “Tariffs” nodes, we need to make arrows they follow a bit more detailed.

So, instead of the “Zones” node  following just one “selected” arrow, we want it to follow either the “first” or the “all” arrow.

This change needs to be reflected in the handler as well.

When reacting to the FIRST action, it should follow the “first” arrow.

Similarly, when reacting to the “ALL” action, it should follow the “all” arrow.

To make sure we didn’t break anything, we may want to run the tests.

Everything looks fine, so let’s move to the “Tariffs” node.

Here we also want the arrows to give us a bit more information.

That’s why we are going to follow either the student arrow or the regular arrow, and not just the “selected” arrow.

In the same way as we’ve just done in the handler of the Zones node, here we also want to update the way the node reacts to actions.

And again, to make sure everything works after this refactoring, let’s run the tests.

Alright, they are still green. :)

We’re ready to test the first flow with the extra step.

It’s about:
- selecting all zones
- going to the tariffs screen
- Selecting the student tariff 
- going to the screen dedicated for selecting means of transport
- selecting all means of transport
- seeing the thanks screen
- closing the thanks screen
- seeing the zones again

The steps related to means of transport will live in their own file.

No surprises there.

We’re expecting the screen to contain a message describing what needs to be done and two buttons to select either all means of transport or just buses.

The graph needs to be extended with a new node: MeansOfTransport.

The first step is to add a leaf.

Then, we add it to the “main” graph.

This screen is supposed to be displayed between Tariffs and Thanks when it’s a student ticket.

Let’s place it there. 

It means that the “student” arrow doesn’t go directly to “Thanks”.

It goes to the “MeansOfTransport” node instead.

Only then, when the means of transport are selected, it goes it “Thanks”.

The graph is not complete yet.

The requirements clearly state that this extra step appears only when we’re buying a student ticket valid in all the zones.

It is not supposed to be displayed for a first zone only ticket.

It means we need to introduce the second path in the graph a lot earlier, starting all the way from “Zones”, not just “Tariffs”.

To do so, we are going to duplicate the “Tariffs” node.

We rename the current one to Tariffs#1.

After that, we create another node called “Tariffs#2”.

We get to Tariffs#2 when the users selects the first zone and we get to Tariffs#1 when the user selects all zones.

From Tariffs#2 we go to “Thanks” both when the customer wants a regular ticket and when they want a student ticket.

Finally, we associate the Tariffs#2 node with the Tariffs leaf and the MeansOfTransport node with the MeansOfTransport leaf.

The handler of MeansOfTransport is very similar to other handlers.

There’s just no need to make different decisions depending on the selected means of transport, and that’s why we can simply follow a “selected” arrow.

The last thing to do is to fix the Tariffs nodes. 

Now there are two children of the “main” graph that are the Tariffs screen: Tariffs#1 and Tariffs#2. 

That’s why we’re going to create two symlinks to the Tariffs directory called Tariffs#1 and Tariffs#2, so that the Rosmaro command line utilities know how to generate bindings for them.

Speaking of bindings, it’s time to refresh them by running npm run rosmaro-bindings:generate.

Just to verify everything is working as expected, let’s run the tests.

We can see it in the browser:
- we select all zones
- then we state that we’re a student
- and here it is - the screen to select means of transport.

It works as expected and allows to complete the flow.

To extend the safety net of automated testing, let’s add a test for the case when we select just buses.

# PLACING THE ORDER

So far all what our application does is displaying various screens.

It does it in the proper order and supports all the required paths, what’s good.

However, it doesn’t actually place the order.

That’s going to change now.

We are going to assert that the order is placed as soon as the user provides all the required answers.

It will be another test step.

For convenience, all the test steps related to orders will live in a dedicated file - test/steps/order.

The `consumeEffects` function from the rosmaro-testing-library will help us to make sure that the expected effect is returned.

It builds a test step that allows to examine (egg-za-min) all the effect objects returned by the previous steps. 

It’s a good start to just cause an effect, even if it’s incomplete.

That’s why for now we will cause a very generic “ORDER” effect.

We will populate it with details later.

Because the order is supposed to be placed in various moments, like after the MeansOfTransport step or sometimes, but not always, after the Tariffs step, it deserves a dedicated node, so that we can clearly express it in the graph.

Let’s call the new leaf “Order”.

Okay.

Now we can add it to the main graph.

The goal of this node is to place the order.

Currently, nothing special happens when the flow is finished.

The user just gets to the “Thanks” screen.

Let’s change that by putting the “Order” step between the last flow step and the “Thanks” screen.

All the arrows are the same, just instead of pointing at the “Thanks” node, they are pointing at the “Order” node.

Of course we don’t want to abandon the “Thanks” node. 

We want the user to land on this screen as soon as the order is placed.

To do that, we draw an arrow from the “Order” node to the “Thanks” node and call it “placed”.

The new graph is ready.

We can now generate the code.

Associating code with the newly created node starts with a new file Order/index.js.

What we need is a binding with a handler.

So far it’s nothing new. We’ve already done things like that.

What’s new is how we are going to instruct Rosmaro to actually do something when this state is entered.

We are not going to just render this state, like we did it in the other ones. 

This one will have an entry action.

Thanks to the fact that the Rosmaro snabbdom starter makes use of the rosmaro-binding-utilities to support entry actions, we can simply handle the ON_ENTRY action like any other action.

We want this node to immediately follow the “placed” arrow and cause an effect - place an order.

The last thing to do here for now is to import the makeHandler function from the src/utils/handlers file.

After regenerating the bindings by running npm run Rosmaro-bindings:generate we can run the tests to see that the order is placed.

It means the Order node is entered, returns an effect and follows an arrow to the Thanks node.

If we take a look at it in the browser, we  won’t see anything new. 

It’s because this state newer renders and we’re not handling this effect in any way yet.

The Rosmaro Snabbdom starter we are using here combines many of the battle tested JavaScript libraries, like Redux for state management and Redux-Saga for side effects.

Redux-Saga is what we are going to use to handle the ORDER effect.

For the sake of the demonstration, we will simply console.log a message.

So instead of the example PING-PONG saga, we want to react to ORDER effects.

They will all be consumed by a function named placeOrder.

For now, the only job of this function will be to console.log a message.

Let’s see how does it work in the browser.

As soon as the order is placed, there’s a message in the console.

Now, that we know that the order is correctly placed in one of the cases, we may update all the remaining tests to make sure the order is always placed.

# ORDER DATA

Our empty order effect is a good start, but it’s not so useful now, because it doesn’t contain any order data.

There’s no way it can be consumed in any useful way.

Let’s make it more detailed.

Instead of expecting just an order, we may be more precise and expect an order for a particular type of a ticket.

The test steps need to be updated.

The exported constant is not anymore a test step itself.

Now it’s a function that returns the test step meant to ensure that there’s the expected effect.

This function will take the data we expect to find in the effect.

The Order step will dispatch the model context as the order data.

The context is the data related state of a Rosmaro model.

That is all the state that is mostly about storying information and not driving the behavior. 

For every new Rosmaro model, the context is undefined.

To give it an initial value, we will extend the main/index.js binding.

A binding is not limited to just a handler. It may also defined (di-fine) a lens.

A lens is a way to adapt the context.

We will use the initialValueLens from the Rosmaro-binding-utils package to alter the shape of the context in such a way that when it’s undefined, then it becomes an empty object.

Please note that the lens property is actually a function that returns a lens and not just a lens.

Let’s start with the zones.

Instead of just following an arrow, we want to update the context.

We get the context as a property.

Then, instead of returning just an arrow property, we also return a context property.

This is the new, updated version of the context.

In this very case, we want it to specify the selected zones, that is the first zone.

We return a new object, that is very much like the previous context object, just with the zones property set to ‘first’.

Finally, we do the same with the ALL action: we read the current context and return a new one.

Because the selected tariff is also very important, a similar change needs to be introduced in the Tariffs/index.js binding as well.

We don’t just follow arrows. We also collect the order data.

Here it’s all about setting the “tariff” property.

When it comes to the Means Of Transport handler, we may approach it in a bit different way.

The selected option will be part of the dispatched action.

Then, when consuming the SELECT action, we access both the current context and the action object.

Finally, the value read from the action lands in the context.

Running the tests proves that all the data is collected.

We may want to update the saga, so that the order data is visible in the browser.

As we can see, all the selected options are now ready to be consumed by the saga.

Unfortunately, there’s a bug.

The order data, once filled in, is never cleared.

That’s why after ordering a ticket with clearly specified means of transport, every other ticket will also have means of transport specified, even if they should not be part of it.

For example, here we first order a regular ticket for the first zone and see, that the data is correct. It contains exactly what it needs to contain and nothing more.

Then, we also order a ticket that specifies means of transport.

Finally, we run into an issue by ordering a regular ticket for the first zone. 

It contains one extra field we don't expect to be here - that is means of transport.

Let’s write a test for such a scenario (sea-nah-ryo).

The first part of the flow is all about placing an order that has three fields: zones, tariffs, and means of transport.

The second part places a simpler order, that has just zones and tariffs.

We expect that the order will have just two fields.

As we can see, the test fails due to an unexpected extra field.

We want to somehow reset the collected order data before each order, so that it always starts as an empty collection.

To make it clear, we are going to express this step in the graph.

It will be the job of another leaf - Reset.

We need it in the main graph.

Because the first order should also be an empty order at the beginning, the arrow from the “start” entry point is now pointing at the Reset node which then redirects to the “Zones” node.

Every time the ticket vending machine starts, the memory of the order should be cleared.

That’s why instead of going to “Zones” directly from the “start” entry point, we will put the “Reset” step between these two.

Also, to clear the memory after every order, instead of going from “Thanks” to “Zones”, it will go to “Reset”, which then will redirect to “Zones”.

The last step when it comes to the graph is to select the underlaying node - Reset.

The binding of this node will look very similar to what the Order node looked like at the very beginning.

It will also define an entry action.

Just instead of causing an effect, it will alter the context.

Here the context value is simply set to an empty object.

All the tests are passing now.

When running it in the browser, we can, that there are no more unexpected fields in the order.

Because the context is now cleared in an entry action, we don’t need the initial value lens anymore.

It may be safely removed.

Just to make sure, let’s run the tests.

# NEW REQUIREMENTS

As soon as the first version of the application is finished, we get some new requirements.

It turns out that the order may sometimes fail.

We are expected to add error handling and a way to let the custom try to place the order again.

So far all of our tests cover just the happy path - when the order is placed. 

Now, that we are introducing errors, this fact should be re-flected in the tests.

First, test cases are renamed to re-flect that they are all describing what happens when the order is placed successfully.

Then, we assume that there’s some sort of “please wait” message visible until we receive an order confirmation.

This message is considered visible when the text “please wait” is on the screen.

The confirmation comes to the model as an ORDER_SUCCESS action.

Currently, the Order node doesn’t render anything.

Let’s change it and put there a message indicating the order is in progress.

We want this node to follow the “placed” arrow when it gets a confirmation of a successfully placed order, that is an ORDER_SUCCESS action.

Also, we don’t want it to immediately (ih-mee-dee-it-lee) follow an arrow anymore.

Tests are passing.

To see that in the browser, we need to update our fake saga.

Now it dispatches ORDER_SUCCESS after one and a half seconds.

Here’s our waiting screen!

Okay, the happy path is covered.

It’s time to handle errors.

The error flow will be quite similar to the happy path visible here.

That’s why we can use it as a template.

Instead of a success there will be an error.

Getting an error causes a transition to the error screen.

From there, the order may be cancelled, what brings us back to "zones".

Now, let’s apply the appropriate changes to the list of steps.

Instead of an order success action we feed the model with an order error action.

Also, we will use new screen steps for the error screen.

First, we see the error.

Then, we close it.

After that, we make sure that no order is placed.

It confirms the fact that it’s been successfully cancelled.

Finally, we’re back to the “Zones” screen.

We’re about to create a new set of steps for the error screen.

Let’s import it.

Feeding the model with an error action is very similar to feeding it with any other action.

It’s simply a step that defines what action should the model be fed with.

The error screen is going to be very much like the thanks screen.

It will just have a different message and a different button.

Because we also want to see and interact with these things, we can use the test steps for thanks as a template.

Now, that the test cases are ready, it’s time to work on the graph.

A new leaf will represent the Error screen.

In the main graph, there will be a new path that goes to this error node when there’s an error on the order screen.

Then, when the user clicks the cancel button, we go to the very beginning of the flow, that is to the node that clears the order and starts everything from the very beginning.

Let’s save the graph.

The error action is not supported yet.

Here we are going to make the order node follow the error arrow when it gets an error action.

To build the error screen quickly, we will use the Thanks as a base

We just need to change the message, the label of the button and the followed arrow.

Nothing new so far.

The step that asserts that no order has been placed is a bit more interesting.

It makes sure that since the last time we consumed the effects, there has been no new effect.

To benefit from the new node we just drew and the code we just wrote, we need to regenerate the bindings.

The tests are passing.

In order to be able to easily observe the error screen in the browser, let’s slightly modify the fake saga.

It will randomly finish with either ORDER_SUCCESS or ORDER_ERROR.

Let’s try to place an order a couple of times.

And here’s our error screen!

We’re almost done.

There’s just one more requirement we need to meet.

There must be a way to try place the order again.

Let’s add a new expectation to the step responsible for “seeing” the error. 

From now on “try again” must be visible as well.

There’s also a way to click “try again”.

Let’s put all these steps together into a test flow.

It’s going to start like the previous case - we place an order for a simple ticket.

After getting an error, we try again.

Then, we make sure that the order is placed again.

Next, the model is fed with an order success action.

After that, we see the thanks screen.

And finally, we’re back to the zones.

This flow needs to be implemented in the graph.

So instead of having just one arrow pointing from Order to Error, we also need an arrow that will let the user go from the Error screen back to the “Order” screen.

Finally, let’s add the try again button and make it follow the “try again” arrow.

To see it working, let’s try to land on the error screen.

There’s a new button we may click.

And as we can see, we’ve just placed a new order.