import React, { useState, useRef, useEffect } from "react";

const RemoteMicroApp = ({
  appName,
  remoteEntryPath,
  devBaseUrl,
}: {
  appName: string;
  remoteEntryPath: string;
  devBaseUrl: string;
}) => {
  const [isLoaded, setIsLoadded] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  useEffect(() => {
    let remoteEntryUrl = remoteEntryPath;
    // @ts-ignore
    const runRemoteAppInDevelopment = IS_DEVELOPMENT && !!devBaseUrl;
    if (runRemoteAppInDevelopment) {
      remoteEntryUrl = new URL(remoteEntryUrl, devBaseUrl).toString();
    }
    debugger;
    // load the remoteEntry.js script for the micro frontend app
    new Promise((resolve, reject) => {
      const scriptElement = document.createElement("script");
      scriptElement.src = remoteEntryUrl;
      scriptElement.type = "text/javascript";
      scriptElement.async = true;
      scriptElement.onload = resolve;
      scriptElement.onerror = reject;
      document.head.appendChild(scriptElement);
    })
      .then(() => {
        setIsLoadded(true);
      })
      .catch(() => {
        setIsLoadded(false);
        setIsErrored(true);
      });

    return () => {
      const scriptElement = document.querySelector(
        `script[src="${remoteEntryUrl}"]`,
      );
      if (scriptElement) {
        document.head.removeChild(scriptElement);
      }
    };
  }, [appName]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isErrored) {
    return <div>Error loading remote micro frontend app</div>;
  }

  const MicroAppContainer = () => {
    const containerRef = useRef(null);
    useEffect(() => {
      (async () => {
        const microAppObj = (window as any)[appName];

        if (microAppObj) {
          const [rootFactory, reactDomFactory] = await Promise.all([
            microAppObj.get("./Root"),
            microAppObj.get("./RemoteReactDom"),
          ]);
          const RemoteRootModule = rootFactory().default;
          const RemoteReactDom = reactDomFactory().default;
          if (RemoteReactDom && RemoteRootModule && containerRef.current) {
            // if react version we can also load expose it in remoteEntry.js and use it here instead of loading react and react-dom as host app dependencies
            const RemoteComponent = React.createElement(RemoteRootModule);
            RemoteReactDom.createRoot(containerRef.current).render(
              RemoteComponent,
            );
          }
        }
      })();
    }, []);

    return <div ref={containerRef} id="micro-fe-container" />;
  };

  return <MicroAppContainer />;
};

export default RemoteMicroApp;
