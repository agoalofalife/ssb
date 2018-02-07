
module.exports = class ParserMessage{
    /**
     *
     * @param schema
     * @param response response from slack
     * @param parent link to parent class
     * @param baseObject
     */
  constructor(schema, response, baseObject = null, parent = null) {
      if (Array.isArray(schema) === false) throw new SyntaxError('Expected first argument is array type!');
        this.currentRoute = schema;
        this.parent = parent;
        this.responseSlack = response;
        this.baseObject = baseObject;
  }

 /**
 *
 * @return objectMessageType or null
 */
  async run() {
      for (let i = 0; i < this.currentRoute.length; i++) {
          let objectSchema = this.currentRoute[i];
          let currentLevelObject = new objectSchema.class(this.responseSlack, this.baseObject, this.parent);

          if (Array.isArray(objectSchema.routes) && objectSchema.routes.length > 0 && await objectSchema.class.route(this.responseSlack)) {
              return (new ParserMessage(objectSchema.routes, this.responseSlack, this.baseObject, currentLevelObject)).run();
          } else {
              if(Array.isArray(objectSchema.routes) && objectSchema.routes.length === 0 && await objectSchema.class.route(this.responseSlack)) {
                  return currentLevelObject;
              }
          }
      }
      return this.parent;
  }
};