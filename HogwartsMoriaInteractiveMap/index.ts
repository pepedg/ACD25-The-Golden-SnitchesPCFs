import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { MappedinControl } from "./MappedinComponent";
import React from 'react';
import { createRoot } from "react-dom/client";

export class HogwartsMoriaInteractiveMap implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    // Declare the notifyOutputChanged function
    private notifyOutputChanged: () => void;
    private _container: HTMLDivElement;
    private _mapDiv: HTMLDivElement;

    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this._container = container;

        if (this._container) {
            // Create and configure the map div
        const mapDiv = document.createElement("div");
        mapDiv.id = "mapDiv"; // Set ID directly

        // Apply styles for full utilization of container space
        Object.assign(mapDiv.style, {
            position: "relative",
            width: "100%",
            height: "100%",
            borderStyle: "solid",
            margin: "auto",
        });

        // Append the map div to the container
        this._container.appendChild(mapDiv);
        } else {
            console.error("Root element not found!");
        }
    }


    public updateView(context: ComponentFramework.Context<IInputs>): void {
        console.log("updateView called");

        const props = {
            onDataChange: () => {
                console.log("Data has changed");
                this.notifyOutputChanged();
            }
        };
        
        // Use createRoot for React 18
        const root = createRoot(this._container); // Create a root
        root.render(React.createElement(MappedinControl, props)); // Render the component
    }


    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    getOutputs(): IOutputs {
        // Return the updated value
        return {
            // Add code to return the updated value
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    destroy(): void {
        // Add code to cleanup control if necessary
    }
}
