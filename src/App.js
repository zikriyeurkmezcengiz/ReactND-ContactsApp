import React, { Component } from "react";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";
import { Route } from "react-router-dom";
class App extends Component {
  state = {
    contacts: [],
    screen: "list",
  };
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState(() => ({
        contacts,
      }));
    });
  }

  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => c.id !== contact.id),
    }));

    ContactsAPI.remove(contact);
  };
  onCreateContact = (contact) => {
    ContactsAPI.create(contact).then((contact) => {
      this.setState((currentState) => ({
        contacts: currentState.contacts.concat([contact]),
      }));
    });
  };
  filterContact = (query) => {
    this.setState((currentState) => ({
      contacts:
        query === ""
          ? currentState.contacts
          : currentState.contacts.filter((c) =>
              c.name.toLowerCase().includes(query.toLowerCase())
            ),
    }));
  };
  render() {
    return (
      <div>
        <Route
          path="/"
          exact
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
              onFilterContact={this.filterContact}
              onNavigate={() => {
                this.setState(() => ({
                  screen: "create",
                }));
              }}
            />
          )}
        />
        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={(contact) => {
                this.onCreateContact(contact);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
